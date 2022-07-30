import { Col, Row } from 'antd';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/authSlice';
import '../../styles/Login.less';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  // Redux
  const { backGroudPrimary, text, textBlurPrimary } = useSelector(
    (state: any) => state.theme.colors
  );
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const dispatch: any = useDispatch();
  const [typeLogin, setTypeLogin] = useState<boolean>(true);
  const history = useNavigate();

  const onChangeTypeLogin = (e: any) => {
    setTypeLogin(e);
  };

  const onFinish = async (values: { email: string; password: string }) => {
    const result = await dispatch(login(values));
    console.log(result);
    if (result.meta.requestStatus === 'fulfilled') {
      if (result.payload.token) {
        notify();
        setTimeout(() => {
          console.log(localStorage.getItem('register'));
          if (localStorage.getItem('register') === 'new') {
            history('/');
          } else {
            history(-1);
          }
        }, 2000);
      } else {
        alert(result.payload.message);
      }
    }
  };
  const notify = () => toast('successful login!');

  // console.log(user);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{ backgroundColor: backGroudPrimary, padding: '0 20px' }} className="loginInner">
        <Row gutter={[48, 48]}>
          <Col xs={0} sm={4} md={4}></Col>
          <Col xs={24} sm={24} md={16}>
            <div style={{ color: text, textAlign: 'center' }} className="loginInnerHeader">
              Binance Account Login
            </div>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <div className={darkMode ? 'darkMode formLogin' : 'formLogin'}>
                  <div className="typeLogin">
                    <div
                      style={{ color: text }}
                      onClick={() => onChangeTypeLogin(true)}
                      className={typeLogin ? 'active' : ''}
                    >
                      Email
                    </div>
                    <div
                      style={{ color: text }}
                      onClick={() => onChangeTypeLogin(false)}
                      className={typeLogin ? '' : 'active'}
                    >
                      Phone Number
                    </div>
                  </div>
                  <div className={'formForm'}>
                    <Form
                      layout="vertical"
                      name="basic"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      {typeLogin ? (
                        <Form.Item
                          style={{ display: 'flex', color: text }}
                          label={<div style={{ color: text }}>Email</div>}
                          name="emailOrphone"
                          rules={[
                            { required: true, message: 'Please input your Emai!' },
                            { type: 'email', message: 'error! xd: abc123@gmail.com' },
                          ]}
                          hasFeedback
                        >
                          <Input />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          hasFeedback
                          name="emailOrphone"
                          label={<div style={{ color: text, width: '110px' }}>Phone Number</div>}
                          style={{ display: 'flex', color: text }}
                          rules={[
                            { required: true, message: 'Please input your phone Number!' },
                            { type: 'number' },
                            { min: 9 },
                            { max: 12 },
                          ]}
                        >
                          <Input placeholder=" XD: 0397879378 " />
                        </Form.Item>
                      )}

                      <Form.Item
                        hasFeedback
                        style={{ display: 'flex' }}
                        label={<div style={{ color: text }}>Password</div>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password />
                      </Form.Item>
                      {/* 
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item> */}

                      <Form.Item style={{ width: '100%' }} noStyle={true}>
                        <Button
                          style={{
                            width: '100%',
                            fontSize: '1.8rem',
                            height: '48px',
                            color: '#1E2329',
                            fontWeight: 500,
                          }}
                          type="primary"
                          htmlType="submit"
                          // loading={Auth.loading}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <div className="content-botton">Forgot PassWord ?</div>
                  <Link to="/register" className="content-botton">
                    Register Now?
                  </Link>
                </div>
              </Col>
              <Col xs={0} sm={0} md={12}>
                <div className="qrCode">
                  <div className="imgQRcode">
                    <img
                      style={{ width: '150px', height: '150px', border: '1px solid #ccc' }}
                      src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                      alt="QR code"
                    />
                  </div>
                  <div style={{ color: textBlurPrimary }} className="QR_content">
                    Log in with QR code
                  </div>
                  <div style={{ color: textBlurPrimary }} className="QR_content2">
                    Scan this code with the <a href="/">Binance mobile app</a> to log in instantly.
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={4} md={4}></Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
