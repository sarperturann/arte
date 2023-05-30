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
                        width: 1850,
                        height: 1800
                    }
                }} />
            </div>
        </div>
    )
}

export default Preview;