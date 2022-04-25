/*
*-----------------------------Routes Section------------------------
*/
exports.geteMethod = async (req, res) => {
    try {

        res.status(200).json({ statusCode: 'OK', statusValue: 200, message: 'Get Method app1' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 'ERROR', statusValue: 500, message: 'Unable to Process your request' });
    }
};

//----------------
exports.postMethod = async (req, res) => {
    try {

        res.status(200).json({ statusCode: 'OK', statusValue: 200, message: 'Post Method app1' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 'ERROR', statusValue: 500, message: 'Unable to Process your request' });
    }
};

