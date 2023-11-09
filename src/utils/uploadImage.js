import uploadImageApi from "../apis/uploadImage";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await uploadImageApi(formData);
        if (response.status !== 200) {
            throw new Error('loi')
        }
        return response.data;
    } catch (error) {
        console.log(error)
        return null
    }
}

export default uploadImage;