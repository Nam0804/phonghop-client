import React, { useState } from 'react';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
const ButtonComponent: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
    <>
        <Button type="primary" size={size} >
          Button
        </Button>
    </>
  );
};

export default ButtonComponent;