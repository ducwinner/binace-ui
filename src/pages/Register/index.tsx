import { Col, Row } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles//Login.less';

function Register() {
  const [typeLogin, setTypeLogin] = useState<boolean>(true);

  const onChangeTypeLogin = () => {
    setTypeLogin(!typeLogin);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div className="loginInner">
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div className="loginInnerHeader">Binance Account Login</div>
            <Row>
              <Col span={12}>
                <div className="formLogin">
                  <div className="typeLogin">
                    <div onClick={onChangeTypeLogin} className={typeLogin ? 'active' : ''}>
                      Email
                    </div>
                    <div onClick={onChangeTypeLogin} className={typeLogin ? '' : 'active'}>
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
                        label="Full Name"
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
                          label="Email"
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
                          label="Phone Number"
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        hasFeedback
                        style={{ display: 'flex' }}
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                          { required: true, message: 'Please input your password!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('The two passwords that you entered dose not match');
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
                        <Checkbox>
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
                  <Link to="/" className="content-botton">
                    Register Now?
                  </Link>
                </div>
              </Col>
              <Col span={12}>
                <div className="qrCode">
                  <div className="imgQRcode">
                    <img
                      style={{ width: '300px', objectFit: 'cover' }}
                      src="https://lh3.googleusercontent.com/pLS3LPbpqvHPe3oOeErsDA7QlzwSo9mMxLwG4V-6OZ7dTMCOljsrfQulQ2CRqQ1UTHAvcEol8ZLbmbqm6HRXIBV-xEhfKXbsd-Iz=w1400-k"
                      alt="QR code"
                    />
                  </div>
                  <div className="QR_content">Log in with QR code</div>
                  <div className="QR_content2">
                    Scan this code with the <a href="/">Binance mobile app</a> to log in instantly.
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Register;