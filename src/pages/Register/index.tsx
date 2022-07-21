import { Col, Row } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles//Login.less';

function Register() {
  //Redux
  const { backGroudPrimary, textPrimary, text, textBlurPrimary, backGroudSP } = useSelector(
    (state: any) => state.theme.colors
  );
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  const [typeLogin, setTypeLogin] = useState<boolean>(true);

  const onChangeTypeLogin = (e: any) => {
    setTypeLogin(e);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ height: '100%' }}>
      <div style={{ backgroundColor: backGroudPrimary, padding: '0 20px' }} className="loginInner">
        <Row>
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
                  <div className="formForm">
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
                      <Form.Item
                        label={<div style={{ color: text }}>Full name</div>}
                        name="name"
                        rules={[
                          { required: true, message: 'Please input your Full Name ' },
                          { type: 'string' },
                          { min: 3 },
                        ]}
                        hasFeedback
                      >
                        <Input />
                      </Form.Item>
                      {typeLogin ? (
                        <Form.Item
                          style={{ display: 'flex' }}
                          label={<div style={{ color: text }}>Email</div>}
                          name="Email"
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
                          name="PhoneNumber"
                          label={<div style={{ color: text }}>Phone number</div>}
                          style={{ display: 'flex' }}
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

                      <Form.Item
                        hasFeedback
                        style={{ display: 'flex' }}
                        label={<div style={{ color: text }}>Confirm pw</div>}
                        name="confirmPassword"
                        rules={[
                          { required: true, message: 'Please input your password!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                'The two passwords that you entered dose not match'
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        name="check"
                        valuePropName="checked"
                        rules={[{ required: true, message: 'You can agree' }]}
                      >
                        <Checkbox style={{ color: textBlurPrimary }}>
                          I have read and agree to <a href="/">Binance’s Terms</a> of{' '}
                          <a href="/">Service and Privacy Policy</a>.
                        </Checkbox>
                      </Form.Item>

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
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <div className="content-botton">Forgot PassWord ?</div>
                  <Link to="/login" className="content-botton">
                    Login Now?
                  </Link>
                </div>
              </Col>
              <Col xs={0} sm={0} md={12}>
                <div className="qrCode">
                  <div className="imgQRcode">
                    <img
                      style={{ width: '300px', objectFit: 'cover' }}
                      src="https://lh3.googleusercontent.com/pLS3LPbpqvHPe3oOeErsDA7QlzwSo9mMxLwG4V-6OZ7dTMCOljsrfQulQ2CRqQ1UTHAvcEol8ZLbmbqm6HRXIBV-xEhfKXbsd-Iz=w1400-k"
                      alt="QR code"
                    />
                  </div>
                  <div style={{ color: text }} className="QR_content">
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
    </div>
  );
}

export default Register;
