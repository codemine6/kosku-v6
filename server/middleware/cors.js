export default (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
}