import '../../assets/components/NewsPage/Feedback.css';
import Comment from './Comment';

function Feedback() {
    return(
        <div className='feedback-comtainer'>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        
        <input type="text" placeholder='Send feedback'/>
        </div>
    )
};

export default Feedback