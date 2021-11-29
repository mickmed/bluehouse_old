import api from './apiConfig'


export const getCategories = async () => {
  try {
    const resp = await api.get(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Categories`);
    return resp;
  }
  catch (error) {
    throw error;
  }
}



export const getItems = async () => {
  try {
    // const resp = await api.get('/items')
    const resp = await api.get(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Expense?maxRecords=30&view=Grid%20view`);
    return resp
  } catch (error) {
    throw error
  }
}

export const getItemById = async id => {
  console.log(id)
  try {
    const resp = await api.get(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Expense/${id}`);
    // const resp = await api.get(`/items/${id}`)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const createItem = async item => {
  console.log(item)

  try {
    const resp = await api.post(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Expense`,
      {
        "records": [
          {
            "fields": item
          }
        ]
      }
    )
    return resp.data
  } catch (error) {
    throw error
  }
}

export const updateItem = async (item, id) => {
  try {
    const resp = await api.put(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Expense`,
      {
        "records": [
          {
            "id": id,
            "fields": item
          }
        ]
      })


    return resp.data.records
  } catch (error) {
    throw error
  }
}

export const deleteItem = async id => {
  console.log(id)
  try {
    const resp = await api.delete(`https://api.airtable.com/v0/appjKXvjcVViPcAcb/Expense?&records[]=${id} `)
    return resp.data
  } catch (error) {
    throw error
  }
}
