import isEmpty from 'lodash/isEmpty';

export const myDataOwnAdapter = ({ block, data, id, onChangeBlock, value }) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };
  if (id === 'title' && !isEmpty(value)) {
    dataSaved = {
      ...dataSaved,
      title: value[0].toUpperCase() + value.slice(1),
    };
  }
  onChangeBlock(block, dataSaved);
};
