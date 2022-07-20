import { Col, Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import '../../../styles/Home/needHelp.less';
import { useSelector } from 'react-redux';

function NeedHelp() {
  //Hook Theme
  const { text, textBlurPrimary, textPrimary } = useSelector((state: any) => state.theme.colors);

  return (
    <div className="need-help">
      <div style={{ color: text }} className="help-header">
        Need help?
      </div>
      <div className="help-container">
        <Row>
          <Col sm={12} md={8} style={{ display: 'flex' }}>
            <div>
              <img src="https://img.icons8.com/ios-glyphs/60/000000/supplier.png" alt="img" />
            </div>
            <div className="help-container-main">
              <div style={{ color: text }} className="title">
                24/7 Chat Support
              </div>
              <div style={{ color: textBlurPrimary }} className="describe">
                Get 24/7 chat support with our friendly customer service agents at your service.
              </div>
              <div style={{ color: textPrimary }} className="link">
                Chat now &nbsp; <RightOutlined />
              </div>
            </div>
          </Col>
          <Col sm={12} md={8} style={{ display: 'flex' }}>
            <div>
              <img
                src="https://img.icons8.com/ios-glyphs/60/000000/speech-bubble-with-dots.png"
                alt="chat-img"
              />
            </div>
            <div className="help-container-main">
              <div style={{ color: text }} className="title">
                FAQs
              </div>
              <div style={{ color: textBlurPrimary }} className="describe">
                View FAQs for detailed instructions on specific features.
              </div>
              <div style={{ color: textPrimary }} className="link">
                Learn more &nbsp; <RightOutlined />
              </div>
            </div>
          </Col>
          <Col sm={12} md={8} style={{ display: 'flex' }}>
            <div>
              <img src="https://img.icons8.com/ios-glyphs/60/000000/page-setup.png" alt="blog" />
            </div>
            <div className="help-container-main">
              <div style={{ color: text }} className="title">
                Blog
              </div>
              <div style={{ color: textBlurPrimary }} className="describe">
                Stay up to date with the latest stories and commentary.
              </div>
              <div style={{ color: textPrimary }} className="link">
                Learn more &nbsp; <RightOutlined />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default NeedHelp;
