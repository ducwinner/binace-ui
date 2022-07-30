import { Card } from 'antd';
import { useSelector } from 'react-redux';
import '../../styles/component/CardNew.less';

function CardNew({ data, urlImg }: any) {
  const { text, textBlurPrimary, backGroudPrimary } = useSelector(
    (state: any) => state.theme.colors
  );
  return (
    <Card
      hoverable
      cover={
        <div style={{ backgroundColor: backGroudPrimary }} className={'container-new'}>
          <img src={urlImg} alt="img" />
          <div style={{ color: '#C99400' }} className={'subject'}>
            {data.subject}
          </div>
          <div className={'title'}>
            <a style={{ color: text }} href={data.url} target="_blank" rel="noreferrer">
              {data.title}
            </a>
          </div>
          <div className={'text'}>
            <a href={data.url} target="_blank" rel="noreferrer">
              {data.text}
            </a>
          </div>
          <div className={'web'}>
            <h4 style={{ color: textBlurPrimary }}>{data.source}</h4>
            <h5 style={{ color: textBlurPrimary }}>{data.date}</h5>
          </div>
        </div>
      }
    ></Card>
  );
}

export default CardNew;
