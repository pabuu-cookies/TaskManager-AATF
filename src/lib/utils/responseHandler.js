export function successResponse(data = {}, status = 200, headers = {}) {
  const finalHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });

  return new Response(JSON.stringify({ success: true, ...data }), {
    status,
    headers: finalHeaders,
  });
}

export function errorResponse(message = "Server Error", status = 500) {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
