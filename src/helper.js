export const pptxTableParser = tableData => {
  const headerArray = tableData.columns.reduce((o, i) => {
    o.push(i.label);
    return o;
  }, []);

  const headerKeys = tableData.columns.reduce((o, i) => {
    o.push(i.field);
    return o;
  }, []);

  const dataArray = tableData.rows.reduce((o, i) => {
    let entry = [];
    for (var key in i) {
      if (headerKeys.indexOf(key) > -1) {
        entry.push(i[key]);
      }
    }
    if (entry.length) {
      o.push(entry);
    }
    return o;
  }, []);

  return [headerArray, ...dataArray];
};
