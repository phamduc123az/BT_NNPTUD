module.exports={
    SECRET_KEY: process.env.JWT_SECRET || "supersecretkey",
    ADMIN_PERMISSION:['admin'],
    USER_PERMISSION:['admin','user'],
    ERROR_EMAIL:"email phai co dang xxx@domain",
    ERROR_USERNAME:"username chi co the la chu hoac so",
    ERROR_PASSWORD:"password dai it nhat %d ki tu, co it nhat %d chu thuong, %d chu hoa, %d so  va %d ki tu",
    ERROR_ROLE:"role chi duoc 1 trong 2 gom admin or user"
}
