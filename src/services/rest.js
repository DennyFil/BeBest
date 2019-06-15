import axios from 'axios';

let getList = (dataTypePl, pageNb, nbPerPage, dataParams) => {
	
	dataParams.page = pageNb;
	dataParams.per_page = nbPerPage;
	
  try {
    return axios.get('https://api.punkapi.com/v2/' + dataTypePl,{
	  params: dataParams
	})
  } catch (error) {
    console.error(error)
  }
};

let getListCount = (dataTypePl, pageNb) => {

  try {
    return axios.get('https://api.punkapi.com/v2/' + dataTypePl,{
	  params: {
		  page: pageNb
	  }
	})
  } catch (error) {
    console.error(error)
  }
};

export {getList, getListCount}