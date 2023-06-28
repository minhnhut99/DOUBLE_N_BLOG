import Select from '@/components/select/Select';
import Modal from '../modal/Modal';
import { useState } from 'react';
const Example = () => {
  const opt = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
  ];
  const handleSubmit = () => {
    console.log('submit modal');
    setIsOpen(false);
  };
  const handleChangeSelect = () => {};
  const [isOpen, setIsOpen] = useState(true);
  const handleSetIsOpen = () => {
    setIsOpen(false);
  };
  <button onClick={() => setIsOpen(true)}>123</button>;
  return (
    <div>
      <Modal
        title="title heading"
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        children={<p></p>}
        onSubmit={handleSubmit}
        type="preview"
      />
    </div>
  );
};
export default Example;
