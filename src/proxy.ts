import { withAuth } from 'next-auth/middleware'


export default withAuth({
    callbacks: {
        authorized: ({token, req}) => {
           // console.log("Token : ", token);
            console.log("Logging Successful : ",token?.name);
            if(req.nextUrl.pathname.startsWith("/admin")){
                return token?.role === "admin";
            }else{
                return true;
            }
        }
    }
});

export const config = {
    matcher: ['/admin/:path*'],
}