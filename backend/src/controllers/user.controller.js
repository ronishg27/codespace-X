import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import {
	validateEmail,
	validateUsername,
	validateFullName,
	validatePassword,
} from "../utils/validators.js";

const generateAccessAndRefreshToken = async (userId) => {
	try {
		// finding user
		const user = await User.findById(userId);
		// generating tokens
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		// saving only refresh token in db
		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });
		if (accessToken && refreshToken) {
			console.log("token generated successfully");
		}
		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while generating refresh and access token"
		);
	}
};

// registerUser route method

const registerUser = asyncHandler(async (req, res) => {
	console.log("checkpoint from reg");
	// extracting credentials from frontend (req.body)
	// validation of user entered data
	// check if user exist with received username and email
	// create a user object and upload on db
	// remove pw and refresh token field from response
	// check for user creation
	// return response

	const { fullname, username, email, password } = req.body;
	// console.log("email: ", email);
	// console.log("fullname: ", fullname);
	// console.log("password: ", password);

	// const isDataValid =
	//   validateEmail(email) &&
	//   validateFullName(fullname) &&
	//   validatePassword(password) &&
	//   validateUsername(username);

	// if (!isDataValid) {
	//   throw new ApiError(400, "All fields are compulsory and must be valid.");
	// }

	const existedUser = await User.findOne({
		$or: [{ username }, { email }],
	});

	if (existedUser) {
		throw new ApiError(409, "Username or email already exist, use new one");
	}

	//   creating user
	const registeredUser = await User.create({
		fullname,
		username: username.toLowerCase(),
		password,
		email,
	});

	const createdUser = await User.findById(registeredUser._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Something went wrong while registering the user.");
	}
	console.log(createdUser);

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
	// get credentials from frontend
	// check if user exist using the entered username
	// get the credentials from the database using username
	// verify the password
	// generate access and refresh tokens
	// send cookie
	const { username, password } = req.body;
	if (!username) {
		throw new ApiError(400, "Username missing. ");
	}

	const user = await User.findOne({ username });

	if (!user) {
		throw new ApiError(403, "User does not exist.");
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid user Credentials.");
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	);

	const loggedUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	// checkpoint: works fine

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedUser,
					accessToken,
					refreshToken,
				},
				"User logged in successfully. "
			)
		);
});

const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$set: {
				refreshToken: undefined,
			},
		},
		{
			new: true,
		}
	);

	const options = {
		httpOnly: true,
		secure: true,
	};
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	const incomingRefreshToken =
		req.cookies.refreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(
			401,
			"Unauthorized request or refresh token not found. "
		);
	}
	try {
		const decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		const user = User.findById(decodedToken?._id);

		if (!user) {
			throw new ApiError(401, "Invalid request token.");
		}

		if (incomingRefreshToken !== user?.refreshToken) {
			throw new ApiError(401, "Refresh token is expired or used. ");
		}

		const options = {
			httpOnly: true,
			secure: true,
		};

		const { accessToken, newRefreshToken } =
			await generateAccessAndRefreshToken(user._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", newRefreshToken, options)
			.json(
				new ApiResponse(
					200,
					{
						accessToken,
						accessToken: newRefreshToken,
					},
					"Access Token refreshed."
				)
			);
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid ref token.");
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const username =
		req.params.username === ":user-profile"
			? req.user.username
			: req.params.username;
	// console.log(username);
	if (!username?.trim()) {
		throw new ApiError(400, "Username is missing.");
	}
	console.log(username);
	console.log(req.user.username);
	console.log(req.params.username);
	const postAggregate = await User.aggregate([
		{
			$match: {
				username: username?.toLowerCase(),
			},
		},
		{
			$lookup: {
				from: "posts",
				localField: "_id",
				foreignField: "author",
				as: "postedPosts",
			},
		},
		{
			$addFields: {
				postCount: {
					$size: "$postedPosts",
				},
			},
		},
		{
			$project: {
				fullname: 1,
				username: 1,
				postCount: 1,
				email: 1,
			},
		},
	]);

	if (!postAggregate?.length) {
		throw new ApiError(404, "Post does not exist.");
	}
	console.log(postAggregate);

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				postAggregate[0],
				"User details fetched successfully."
			)
		);
});

export {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
	getUserProfile,
};
