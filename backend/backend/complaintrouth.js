const upload = require('../middleware/upload');

router.post('/complaints', upload.single('evidence'), controller.createComplaint);
