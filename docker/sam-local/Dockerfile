FROM public.ecr.aws/sam/build-nodejs18.x:latest

# Install netcat for the healthcheck and other useful tools
RUN yum update -y && \
    yum install -y nc awscli tree && \
    yum clean all