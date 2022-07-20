import { Col, Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import '../../../styles/Home/Possibilities.less';
import { useSelector } from 'react-redux';

function PossibilitiesBinace() {
  //Hook Theme
  const { text, textBlurPrimary, backGroudSP } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  return (
    <div className="possibilities-binace">
      <div className="possibilities-header">
        <div className="possibilities-header-left">
          <div className="title" style={{ color: text }}>
            Trade on the go. Anywhere, anytime.
          </div>
          <div style={{ color: textBlurPrimary }} className="describe">
            Stay in the know with our app and desktop client.
          </div>
        </div>
        <div style={{ color: textBlurPrimary }} className="possibilities-header-right">
          More &nbsp; <RightOutlined />
        </div>
      </div>
      <div className="possibilities-main">
        <Row>
          <Col sm={12}>
            <img
              className="main-img"
              src="https://cryptopro.app/wp-content/uploads/2020/08/crypto-pro-app-ios-ipados-watchos-macos.png"
              alt="img"
            />
          </Col>
          <Col sm={12}>
            <div className="possibilities-main-left">
              <div style={{ backgroundColor: backGroudSP }} className="header">
                <img
                  src="https://thatlungnam.com.vn/wp-content/uploads/2020/12/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png"
                  className="QR-code"
                  alt="img"
                ></img>
                <div className="ios-android">
                  <div style={{ color: textBlurPrimary, fontSize: '1.6rem' }}>Scan to Download</div>
                  <div style={{ color: text, fontSize: '2rem', fontWeight: '500' }}>
                    iOS &#38; Android
                  </div>
                </div>
              </div>
              <div className={darkMode ? 'darkMode down-vehicle' : 'down-vehicle'}>
                <Row>
                  <Col span={8} className="col">
                    <img
                      style={{ width: '30px' }}
                      src={
                        darkMode
                          ? 'https://img.icons8.com/material-rounded/96/000000/mac-os.png'
                          : 'https://img.icons8.com/ios-filled/50/000000/mac-os.png'
                      }
                      alt="apple"
                    />
                    <div style={{ fontSize: '1.4rem', color: text }}>App Store</div>
                  </Col>
                  <Col span={8} className="col">
                    <img
                      style={{ width: '30px' }}
                      src={
                        darkMode
                          ? 'https://img.icons8.com/ios-glyphs/60/000000/android-os.png'
                          : 'https://img.icons8.com/ios-glyphs/60/000000/android-os.png'
                      }
                      alt="apple"
                    />
                    <div style={{ fontSize: '1.4rem', color: text }}>Android APK</div>
                  </Col>
                  <Col span={8} className="col">
                    <img
                      style={{ width: '30px' }}
                      src={
                        darkMode
                          ? 'https://img.icons8.com/ios-filled/50/000000/google-play.png'
                          : 'https://img.icons8.com/ios-filled/50/000000/google-play.png'
                      }
                      alt="apple"
                    />
                    <div style={{ fontSize: '1.4rem', color: text }}>Google Play</div>
                  </Col>
                  <Col span={8} className="col">
                    <img
                      style={{ width: '30px' }}
                      src={
                        darkMode
                          ? 'https://img.icons8.com/ios-glyphs/60/000000/windows8.png'
                          : 'https://img.icons8.com/ios-glyphs/60/000000/windows8.png'
                      }
                      alt="apple"
                    />
                    <div style={{ fontSize: '1.4rem', color: text }}>Window</div>
                  </Col>
                  <Col span={8} className="col">
                    <img
                      style={{ width: '30px' }}
                      src={
                        darkMode
                          ? 'https://img.icons8.com/ios-glyphs/60/000000/linux.png'
                          : 'https://img.icons8.com/ios-filled/50/000000/linux.png'
                      }
                      alt="apple"
                    />
                    <div style={{ fontSize: '1.4rem', color: text }}>Linux</div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PossibilitiesBinace;
