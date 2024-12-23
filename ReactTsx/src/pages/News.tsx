import '../assets/pages/News.css'
import shopLogo from '../assets/img/shop.png';
import bestForbeg from '../assets/img/bestForbeg.jpg';
import Post from '../components/NewsPage/Post';
import Feedback from '../components/NewsPage/Feedback';

function News() {
    return(
        <div className='news-container'>

            <div className='container1'>
                <div>
                    <img src={shopLogo} />
                    <p>Shop for your own Kendama today!</p>
                    <p><a href="">Visit store</a></p>
                </div>             
                <div>
                    <img src={bestForbeg} /> 
                    <p>Best Beginner Kendamas</p>    
                    <p><a href="">Shope now</a></p>               
                </div>       
            </div>

            <div className='container2'>
              <div className='latest-posts'>
                <h1>Latest Posts</h1>
                <div className='posts'>
                <Post/>
                <Post/>
                <Post/>
                <Post/>      
                <Post/> 
                <Post/> 
                <Post/> 
                <Post/> 
                <Post/>             
                </div> 

              </div>

              <div className='feedback'>
                <h1>Feedback</h1>
                <Feedback />
              </div>
            </div>

        </div>
    )
};

export default News