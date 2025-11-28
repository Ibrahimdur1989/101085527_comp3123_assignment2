
const router = require('express').Router();
const { body, param, query, validationResult } = require('express-validator');
const Employee = require('../models/Employee');


// validate request data 
function validate(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const msg = errors.array().map(e => `${e.param}: ${e.msg}`).join(', ');
        return res.status(400).json({ status:false, message: msg });
         
    }    
}


// Get all employees
router.get('/employees', async (req, res, next) => {
    try{
      const employees = await Employee.find().lean();
      const out = employees.map(e => ({
        employee_id: e._id.toString(),
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        position: e.position,
        salary: e.salary,
        date_of_joining: e.date_of_joining,
        department: e.department
    }));
    res.status(200).json(out);
  } catch (err) { next(err); }
    
});


// create new employee
router.post('/employees',
    [
        body('first_name').notEmpty(),
        body('last_name').notEmpty(),
        body('email').isEmail(),
        body('position').notEmpty(),
        body('salary').isNumeric(),
        body('date_of_joining').isISO8601(),
        body('department').notEmpty()
    ],
    async (req, res, next) => {
        try {
          const v = validate(req, res);
          if (v) return;

          const emp = await Employee.create(req.body);
          res.status(201).json({message:'Employee created successfully.', employee_id: emp._id.toString()
          });
        } catch (err) { next(err); }        
    }
)

// find employee by id
router.get('/employees/:eid',
    [ param('eid').isMongoId() ],
    async (req, res, next) => {
        try{
          const v = validate(req, res);
          if (v) return;

          const e = await Employee.findById(req.params.eid).lean();
          if (!e) return res.status(404).json({ status:false, message:'Employee not found'});

          res.status(200).json({
            employee_id: e._id.toString(),
            first_name: e.first_name,
            last_name: e.last_name,
            email: e.email,
            position: e.position,
            salary: e.salary,
            date_of_joining: e.date_of_joining,
            department: e.department
          });
        } catch (err) { next(err); }  
        
    }
);

// update employee info 
router.put('/employees/:eid',
    [ param('eid').isMongoId() ],
    async (req, res, next) => {
        try{
          const v = validate(req, res);
          if (v) return;

          const e = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
          if (!e) return res.status(404).json({ status:false, message:'Employee not found'});

          res.status(200).json({message:'Employee details updated successfully.'});
        } catch (err) { next(err); }  
    }
);


// delete employee
router.delete('/employees',
    [ query('eid').isMongoId() ],
    async (req, res, next) => {
        try{
          const v = validate(req, res);
          if (v) return;

          const doc = await Employee.findByIdAndDelete(req.query.eid);
          if (!doc) return res.status(404).json({ status:false, message:'Employee not found'});
          res.status(204).send();
        } catch (err) { next(err); }
    }
);

module.exports = router;

