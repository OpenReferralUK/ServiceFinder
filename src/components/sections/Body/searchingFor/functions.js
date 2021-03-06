  import { getAgeAction, getAvailabilityAction, getCircumstancesAction, getGenderAction, getNeedsAction, getPostcodeAction, getProximityAction, getServiceTypesAction } from '../../../../Store/Actions/actions';

  export const tagChange = (values, oldData) => {
      switch (oldData.action) {
          case 'remove-value':
              switch (oldData.removedValue.category) {
                  case 'age':
                      return getAgeAction('');
                  case 'postcode':
                      return getPostcodeAction('');
                  case 'proximity':
                      return getProximityAction({
                          value: '',
                          label: ''
                      });
                  case 'gender':
                      return getGenderAction({
                          value: '',
                          label: ''
                      });
                  case 'availability':
                      return getAvailabilityAction(getAvailabilityItems(values, 'availability'));
                  case 'needs':
                      return getNeedsAction(getItems(values, 'need'));
                  case 'circumstances':
                      return getCircumstancesAction(getItems(values, 'circumstance'));
                  case 'servicetypes':
                      return getServiceTypesAction({
                          value: '',
                          label: ''
                      });
                  default:
                      return false;
              }
              default:
                  return false;
      }
  }

  const getAvailabilityItems = (values, type) => {
      let originalValues = [];
      if (values) {
          let filter = values.filter(item => item.category.includes(type));
          filter.map(item => {
              originalValues.push({
                  day: item.original.day,
                  time: item.original.time,
                  type: "availability",
                  value: item.value
              });
          });
      }
      return originalValues;
  }

  const getItems = (values, type) => {
      let originalValues = [];
      if (values) {
          let filter = values.filter(item => item.value.includes(type));
          filter.map(item => originalValues.push({
              value: item.original.id,
              label: item.original.name,
              original: item.original
          }));
      }
      return originalValues;
  }

  export const getDataWithText = (data) => {
      let arrInteracted = [];
      if (data !== {}) {
          for (const obj in data) {
              if (data[obj].value) {
                  if ((data[obj].category !== 'text') && (data[obj].category !== 'gender')) {
                      arrInteracted.push({
                          category: data[obj].category,
                          value: data[obj].value,
                          label: `${data[obj].name}: ${data[obj].label}`,
                          original: data[obj].original
                      })
                  }
              } else {
                  if (data[obj].category !== 'availability') {
                      data[obj].data.map(item => {
                          return arrInteracted.push({
                              category: data[obj].category,
                              value: item.value,
                              label: `${data[obj].name}: ${item.label}`,
                              original: item.original
                          });
                      });
                  } else {
                      data[obj].data.map(item => {
                          return arrInteracted.push({
                              category: data[obj].category,
                              value: item.value,
                              label: `${data[obj].name}: ${item.day.label} at ${item.time.label}`,
                              original: item
                          });
                      });
                  }
              }
          }
          return arrInteracted;
      }
  }

  export const getSearchByText = (data) => {
      let textObj = '';
      if (data !== {}) {
          for (const obj in data) {
              if (data[obj].value) {
                  if ((data[obj].category === 'text') && (data[obj].category !== 'gender')) {
                      textObj = {
                          category: data[obj].category,
                          value: data[obj].value,
                          label: `${data[obj].name}: ${data[obj].label}`,
                          original: data[obj].original
                      }
                  }
              }
          }
          return textObj;
      }
  }