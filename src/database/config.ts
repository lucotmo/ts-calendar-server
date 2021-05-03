import mongoose from "mongoose";

export const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log("DB online");
	} catch (error) {
		console.log(error);
		throw new Error("Error en la base de datos - vea logs");
	}
};
