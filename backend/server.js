import errorHandler from './middleware/errorMiddleware.js'
import express from 'express'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import bodyParser from 'body-parser'
dotenv.config()
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//  TODO: CLOUDINARY SETUP
const options = {
    unique_filename: true,
    use_filename: true,
    overwrite: true,
};
cloudinary.config({
    cloud_name: 'debj2a0wk',
    api_key: '982941926585781',
    api_secret: '8555SmhIF2AcE0mvDFwUuDk0uKg',
});

async function uploadImage(imagePath) {

    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }

}

// TODO: CLOUDINARY SETUP


app.get('/api/image', async(req, res) => {
    console.log(req.body)
    res.status(200).json({ image: "All images sent" })
})

app.post('/api/image', async(req, res) => {
    console.log("The body of the request is", req.body)
    const url = await uploadImage(req.body.imagePath)
    console.log(url)
    res.status(200).json({ "image": url })

})

app.use(errorHandler)
app.listen(5000, () => console.log('server started on port 5000'));