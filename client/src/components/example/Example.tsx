import Select from '@/components/select/Select';
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
  const handleChangeSelect = () => {};
  return (
    <div></div>
    // <div style={{ width: '200px' }}>
    //   <Select
    //     value={'1'}
    //     title="Select category"
    //     options={opt}
    //     onChange={handleChangeSelect}
    //   />
    // </div>
  );
};
export default Example;
