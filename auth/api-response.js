class ApiResponse {
  static ok(res, msg = "success", data = null) {
    return res.json({
      success: true,
      status: 200,
      msg,
      data,
    });
  }
  static created(res, msg, data = null) {
    return res.status(201).json({
      success: true,
      msg,
      data,
    });
  }
  static noContent(res) {
    return res.status(204).send();
  }
}
export default ApiResponse;
