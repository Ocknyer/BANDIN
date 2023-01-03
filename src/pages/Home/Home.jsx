import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopMainNav from '../../components/CommonUI/Nav/TopMainNav/TopMainNav';
import { EmptyHomeWrapper, FeedWrapper, FeedTxt, TopBtn } from './styled';
import CommonPost from '../../components/CommonUI/CommonPost/CommonPost';
import profileImg from '../../assets/profile.png';
import topImg from '../../assets/top-btn.png';
import Button from '../../components/atoms/Button/Button';
import TabMenu from '../../components/CommonUI/TabMenu/TabMenu';
import getFeedPost from '../../api/post/getFeedPost';
import Img from '../../components/atoms/Img/img';

const Home = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    getFeedPost()
      .then((data) => {
        setPostData(data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <TopMainNav id='top' />
      {postData.length !== 0 ? (
        <FeedWrapper>
          <h2 className='ir'>홈 피드</h2>
          {postData.map((post, idx) => {
            return <CommonPost key={idx} post={post} />;
          })}
          <TopBtn>
            <a href='#top'>
              <Img src={topImg} alt='위 방향 화살표' />
            </a>
          </TopBtn>
        </FeedWrapper>
      ) : (
        <EmptyHomeWrapper>
          <h2 className='ir'>홈 피드</h2>
          <img src={profileImg} alt='프로필 이미지' className='profile-img' />
          <FeedTxt>유저를 검색해 팔로우 해보세요!</FeedTxt>
          <Link to='/search'>
            <Button type='button' size='md, lg' tit='검색하기'></Button>
          </Link>
        </EmptyHomeWrapper>
      )}
      <TabMenu place='homefeed' />
    </>
  );
};

export default Home;
