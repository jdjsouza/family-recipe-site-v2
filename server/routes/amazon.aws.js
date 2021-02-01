const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const uploaders3Router = require('react-dropzone-s3-uploader/s3router');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
