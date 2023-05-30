import React,{useState} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import './preview.css'

const Preview = ({img1, img2}) => {
    const [productImage, setProductImage] = useState(img1);
    const imageHandler = (img) => {
        setProductImage(img);
    }
    return (
        <div className='imageSection'>
            <div className='selectImage'>
                <img
                    className={productImage === img1 ? 'activeImage' : ''}
                    src={img1} alt="firstImage"
                    onClick={() => imageHandler(img1)} />
                <img
                    className={productImage === img2 ? 'activeImage' : ''}
                    src={img2} alt="firstImage"
                    onClick={() => imageHandler(img2)} />
            </div>
            {/* magnify component */}
            <div className='magnifyBox'>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: productImage,
                    },
                    largeImage: {
                        src: productImage,
                        width: 1550,
                        height: 1800
                    }
                }} />
            </div>
        </div>
    )
}

export default Preview;