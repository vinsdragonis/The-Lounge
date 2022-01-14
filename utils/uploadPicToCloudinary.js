import axios from 'axios';

const uploadPic = async (media) => {
    try {
        const form = new FormData();
        
        form.append('file', media);
        form.append('upload_preset', 'The_Lounge');
        form.append('cloud_name', 'dragonis');

        const res = await axios.post(process.env.CLOUDINARY_URL, form);
        
        return res.data.url;
    } catch (err) {
        return;
    }
}

export default uploadPic;