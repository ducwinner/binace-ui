import { Modal } from 'antd';
import { useState } from 'react';
import { FaRegGrinBeamSweat, FaHandPointRight } from 'react-icons/fa';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import '../../styles/component/ModalLogin.less';
import { Link } from 'react-router-dom';

function ModalLogin() {
  const { text } = useSelector((state: any) => state.theme.colors);
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={darkMode ? 'darkMode modal-login' : 'modal-login'} style={{ zIndex: 100 }}>
      <Modal
        title={
          <div className="modal-title" style={{ display: 'flex', justifyContent: 'center' }}>
            <FaRegGrinBeamSweat style={{ fontSize: '4rem', color: '#C99400' }} />
          </div>
        }
        className={darkMode ? 'darkMode' : 'darkMode'}
        visible={isModalVisible}
        closable
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={true}
        closeIcon={<CloseCircleOutlined style={{ color: text }} />}
      >
        <div
          className="modal-body"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '1.8rem', color: text }}>You need to login to use this function!</p>
          <div>
            <FaHandPointRight
              style={{ fontSize: '1.8rem', color: text, transform: 'translateY(2px)' }}
            />
            &nbsp; &nbsp;
            <span style={{ fontSize: '2rem', color: '#C99400', fontWeight: 500 }}>
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalLogin;
