"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const errors_1 = require("../utils/errors");
const requireAdmin = async (req, _res, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin') {
        return next(new errors_1.AppError(403, 'Access denied. Admin only.'));
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=admin.middleware.js.map