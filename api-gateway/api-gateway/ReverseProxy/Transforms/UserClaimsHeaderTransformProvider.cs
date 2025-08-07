using System.Security.Claims;
using Yarp.ReverseProxy.Transforms;
using Yarp.ReverseProxy.Transforms.Builder;

namespace api_gateway.ReverseProxy.Transforms;

public class UserClaimsHeaderTransformProvider : ITransformProvider
{
    public void Apply(TransformBuilderContext context)
    {

        context.AddRequestTransform(async transformContext =>
        {
            //  Remove spoofed headers (if any)
            var headers = transformContext.ProxyRequest.Headers;
            headers.Remove("Authorization");
            headers.Remove("X-User-Id");
            headers.Remove("X-User-Email");
            headers.Remove("X-User-Roles");
            headers.Remove("X-User-Name");

            if (context.Route.AuthorizationPolicy != "Authenticated")
            {
                return; // Skip adding the transform for public routes
            }
            var user = transformContext.HttpContext.User;
            if (user.Identity?.IsAuthenticated == true)
            {
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var email = user.FindFirst(ClaimTypes.Email)?.Value;
                var firstName = user.FindFirst(ClaimTypes.GivenName)?.Value;
                var lastName = user.FindFirst(ClaimTypes.Surname)?.Value;
                var username = user.FindFirst("preferred_username")?.Value;
                // var roles = user.FindAll(ClaimTypes.Role).Select(r => r.Value);

                if (!string.IsNullOrEmpty(userId))
                    transformContext.ProxyRequest.Headers.Add("X-User-Id", userId);

                if (!string.IsNullOrEmpty(email))
                    transformContext.ProxyRequest.Headers.Add("X-User-Email", email);
                if (!string.IsNullOrEmpty(firstName))
                    transformContext.ProxyRequest.Headers.Add("X-User-First-Name", firstName);
                if (!string.IsNullOrEmpty(lastName))
                    transformContext.ProxyRequest.Headers.Add("X-User-Last-Name", lastName);
                if (!string.IsNullOrEmpty(username))
                    transformContext.ProxyRequest.Headers.Add("X-User-Name", username);
                // if (roles.Any())
                //     transformContext.ProxyRequest.Headers.Add("X-User-Roles", string.Join(",", roles));
            }
        });
    }
    public void ValidateRoute(TransformRouteValidationContext context)
    {
        // No route validation needed
    }

    public void ValidateCluster(TransformClusterValidationContext context)
    {
        // No cluster validation needed
    }
}
