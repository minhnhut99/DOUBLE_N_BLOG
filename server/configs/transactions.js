const connection = require('./database');

// Khai báo một hàm thực hiện transaction
const transaction = (sqlStatements) => {
    return new Promise((resolve, reject) => {
        // Bắt đầu transaction
        connection.beginTransaction((error) => {
            if (error) {
                return reject(error);
            }
            // Thực hiện các câu lệnh SQL trong transaction
            connection.query(sqlStatements, (error, results) => {
                if (error) {
                    // Nếu xảy ra lỗi, rollback transaction
                    connection.rollback(() => {
                        return reject(error);
                    });
                }
                // Commit transaction
                connection.commit((error) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        });
    });
};

module.exports = transaction;