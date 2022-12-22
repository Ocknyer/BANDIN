import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TopUploadNav from '../../components/CommonUI/Nav/TopUploadNav/TopUploadNav';
import { AddProductSection, AddImageDesc, AddProductForm } from './styled';
import InputBox from '../../components/atoms/InputBox/Input';
import ProductImgInput from '../../components/modules/ProductImgInput/ProductImgInput';
import { productImgSrc } from '../../atoms';

import postProduct from '../../api/addproduct/addproduct';

const AddProduct = () => {
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState('');

  const [isPriceValid, setIsPriceValid] = useState(false);
  const [priceError, setPriceError] = useState('');

  const [isLinkValid, setIsLinkValid] = useState(false);
  const [linkError, setLinkError] = useState('');
  const image = useRecoilValue(productImgSrc);

  const [inputValue, setInputValue] = useState({
    itemName: '',
    price: '',
    link: '',
  });

  const { itemName, price, link } = inputValue;

  const navigate = useNavigate();
  const itemImage = useRecoilValue(productImgSrc);
  const handleData = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    const nameValidator = () => {
      if (itemName.length >= 2 && itemName.length <= 15) {
        setIsNameValid(true);
        setNameError('');
      } else {
        setIsNameValid(false);
        setNameError('* 2~15자 이내여야 합니다.');
      }
    };
    nameValidator();
  }, [itemName]);

  useEffect(() => {
    const priceValidator = () => {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(price)) {
        setIsPriceValid(true);
        setPriceError('');
        // eslint-disable-next-line no-restricted-globals
      } else {
        setIsPriceValid(false);
        setPriceError('* 숫자만 입력 가능합니다.');
      }
    };
    priceValidator();
  }, [price]);

  useEffect(() => {
    const linkValidator = () => {
      if (link.length > 0) {
        setIsLinkValid(true);
        setLinkError('');
      } else {
        setIsLinkValid(false);
        setLinkError('* URL을 입력해 주세요.');
      }
    };
    linkValidator();
  }, [link]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      product: {
        itemName,
        price: parseInt(price, 10),
        link,
        itemImage,
      },
    };

    postProduct(userData)
      .then((data) => {
        console.log(data);
        navigate('/myprofile');
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log(error);
          alert(`${error.response.data.message}`);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <TopUploadNav
        state={isNameValid && isPriceValid && isLinkValid ? null : 'disabled'}
        disabled={
          isNameValid && isPriceValid && isLinkValid ? null : 'disabled'
        }
        handlerSaveBtn={handleSubmit}
      />
      <AddProductSection>
        <h1 className='ir'>상품 등록 페이지</h1>
        <AddProductForm onSubmit={handleSubmit}>
          <AddImageDesc>이미지등록</AddImageDesc>
          <ProductImgInput />
          <InputBox
            label='상품명'
            type='text'
            id='itemName'
            name='itemName'
            placeholder='2~15자 이내여야 합니다.'
            value={itemName}
            errorMsg={nameError}
            onChange={handleData}
            required
          />
          <InputBox
            label='가격'
            type='text'
            id='price'
            name='price'
            placeholder='숫자만 입력 가능합니다.'
            value={price}
            errorMsg={priceError}
            onChange={handleData}
            required
          />
          <InputBox
            label='판매 링크'
            type='url'
            id='link'
            name='link'
            placeholder='URL을 입력해 주세요.'
            value={link}
            errorMsg={linkError}
            onChange={handleData}
            required
          />
        </AddProductForm>
      </AddProductSection>
    </>
  );
};

export default AddProduct;
