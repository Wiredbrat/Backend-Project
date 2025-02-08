//method1: this is a promise wrapper for async functions to handle errors and responses using promises
const asyncHandler = (responseHandler) => (req, res, next) => {
    Promise.resolve(responseHandler(req, res, next))
    .catch((err) => next(err))
}

//method2: this is a async/await wrapper for async functions to handle errors and responses using async/await
// const asyncHandler = (responseHandler) => async (req, res, next) => {
//     try {
//         await responseHandler(req, res, next)
//     }
//     catch(err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export {asyncHandler} // export the asyncHandler function to be used in other files