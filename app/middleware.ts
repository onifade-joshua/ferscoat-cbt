import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get user role from cookie/session (you'll implement actual auth later)
  const userRole = request.cookies.get('userRole')?.value || 'student';
  const pathname = request.nextUrl.pathname;

  // Protected routes for teachers and admins only
  const teacherAdminRoutes = [
    '/teacher/questions',
    '/admin/questions',
    '/teacher/questions/',
    '/admin/questions/'
  ];

  // Check if the current path is a teacher/admin only route
  const isRestrictedRoute = teacherAdminRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Block students from accessing teacher/admin routes
  if (isRestrictedRoute && userRole === 'student') {
    // Redirect to student dashboard with error
    const url = request.nextUrl.clone();
    url.pathname = '/student';
    url.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/teacher/:path*',
    '/admin/:path*',
    '/student/:path*'
  ]
};