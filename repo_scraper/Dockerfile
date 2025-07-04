# Alternative approach with explicit target platform for runtime stage
FROM --platform=$BUILDPLATFORM dart:stable AS build

WORKDIR /app

# Copy pubspec files first for better dependency caching
COPY pubspec.* ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.pub-cache \
    dart pub get

# Copy app source code
COPY . .

# AOT compile app with cache mount
RUN --mount=type=cache,target=/root/.pub-cache \
    dart compile exe bin/server.dart -o bin/server

# Runtime stage - use target platform for proper binary compatibility
FROM dart:stable AS runtime

# Extract just the runtime components we need
RUN mkdir -p /runtime-target && \
    cp -r /runtime/* /runtime-target/

# Final minimal image
FROM scratch
COPY --from=runtime /runtime-target/ /
COPY --from=build /app/bin/server /app/bin/

EXPOSE 8081
CMD ["/app/bin/server"]