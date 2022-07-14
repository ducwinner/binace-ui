import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import '../../../styles/Home/IntroDuceFortfolio.less';
import ButtonPrimary from '../../../components/ButtonLink';

function IntroduceFortfolio() {
  const { text, textBlurPrimary } = useSelector((state: any) => state.theme.colors);

  return (
    <div>
      <div className="introduce-Fortfolio">
        <Row>
          <Col span={14}>
            <div className="introduce-main">
              <div className="introduce-main-header">
                <div style={{ color: text }} className="title">
                  Build your crypto portfolio
                </div>
                <div style={{ color: textBlurPrimary }} className="describe">
                  Start your first trade with these easy steps.
                </div>
              </div>
              <ul className="introduce-main-body">
                <li>
                  <div>
                    <img src="https://img.icons8.com/ios-glyphs/60/000000/supplier.png" alt="img" />
                  </div>
                  <div className="content">
                    <div style={{ color: text }} className="title">
                      Fund your account
                    </div>
                    <div style={{ color: textBlurPrimary }} className="describ">
                      Add funds to your crypto account to start trading crypto. You can add funds
                      with a variety of payment methods.
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="https://img.icons8.com/ios-glyphs/60/000000/supplier.png" alt="img" />
                  </div>
                  <div className="content">
                    <div style={{ color: text }} className="title">
                      Verify your identity
                    </div>
                    <div style={{ color: textBlurPrimary }} className="describ">
                      Complete the identity verification process to secure your account and
                      transactions.
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="https://img.icons8.com/ios-glyphs/60/000000/supplier.png" alt="img" />
                  </div>
                  <div className="content">
                    <div style={{ color: text }} className="title">
                      Start trading
                    </div>
                    <div style={{ color: textBlurPrimary }} className="describ">
                      You're good to go! Buy/sell crypto, set up recurring buys for your
                      investments, and discover what Binance has to offer.
                    </div>
                  </div>
                </li>
              </ul>

              <ButtonPrimary title="Get Start" path="/" />
            </div>
          </Col>

          <Col span={10}>
            <img
              src="https://coinstats.app/_next/static/images/mockupDark-13e8bd4fddd525a0df64928edd6cf499.png"
              alt="img"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default IntroduceFortfolio;
