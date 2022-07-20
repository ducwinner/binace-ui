import '../../../styles/Footer.less';

import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
// ...

function Footer() {
  const { backGroudPrimary, text } = useSelector((state: any) => state.theme.colors);
  return (
    <div
      style={{
        backgroundColor: backGroudPrimary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="FooterInner">
        <div className="FooterInnerTop">
          <Row>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>About Us</div>
              <div>Careers</div>
              <div>Business Contacts</div>
              <div>Community</div>
              <div>Binance Blog</div>
              <div>Terms</div>
              <div>Privacy</div>
              <div>Risk Warning</div>
              <div>Announcements</div>
              <div>News</div>
              <div>Notices </div>
              <div>Cookie Preferences</div>
            </Col>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>Products</div>
              <div>Exchange</div>
              <div>Academy</div>
              <div>Binance Live</div>
              <div>Binance Blog</div>
              <div>Charity</div>
              <div>Card</div>
              <div>Labs</div>
              <div>Launchpad</div>
              <div>News</div>
              <div>Research </div>
              <div>Binance Pay</div>
            </Col>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>Service</div>
              <div>Downloads</div>
              <div>Desktop Application</div>
              <div>Buy Crypto</div>
              <div>Binance Blog</div>
              <div>Charity</div>
              <div>Card</div>
              <div>Labs</div>
              <div>Launchpad</div>
              <div>News</div>
              <div>Research </div>
              <div>Binance Pay</div>
            </Col>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>Give Us Feedback</div>
              <div>Support Center</div>
              <div>Submit a request</div>
              <div>APIs</div>
              <div>Fees</div>
              <div>Trading Rules</div>
              <div>Binance Verify</div>
              <div>Law Enforcement Requests</div>
            </Col>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>Learn</div>
              <div>Learn &dollar; Earn</div>
              <div>Browse Crypto Prices</div>
              <div>Buy BNB</div>
              <div>Buy BUSD</div>
              <div>Buy Bitcoin</div>
              <div>Buy Ethereum</div>
              <div>Buy Litecoin</div>
              <div>Buy Ripple</div>
              <div>Buy Dogecoin</div>
              <div>Buy DeFi </div>
              <div>Buy SHIB Buy</div>
              <div>Tradable Altcoins</div>
            </Col>
            <Col xs={12} sm={8} md={6} xl={4} className="colFooter">
              <div style={{ color: text }}>Community</div>
              <Row>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/color/48/000000/telegram-app--v1.png"
                    alt="telegram"
                  />
                </Col>
                <Col span={8}>
                  <img src="https://img.icons8.com/windows/32/000000/blog-logo.png" alt="tiktok" />
                </Col>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                    alt="facebook"
                  />
                </Col>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/fluency/48/000000/instagram-new.png"
                    alt="instagram"
                  />
                </Col>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/color/48/000000/youtube-play.png"
                    alt="youtobe"
                  />
                </Col>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/bubbles/50/000000/discord-logo.png"
                    alt="discord"
                  />
                </Col>
                <Col span={8}>
                  <img
                    src="https://img.icons8.com/cute-clipart/64/000000/reddit.png"
                    alt="reddit"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div className="FotterinnerBt">Binance © 2022</div>
    </div>
  );
}

export default Footer;
