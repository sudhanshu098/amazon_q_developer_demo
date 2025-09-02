# CloudFormation Template Deployment Guide

## Quick Start

### Prerequisites
1. AWS CLI configured with appropriate permissions
2. An existing EC2 Key Pair in your target region
3. Determine your allowed SSH CIDR range (NOT 0.0.0.0/0)

### Basic Deployment
```bash
aws cloudformation create-stack \
  --stack-name secure-infrastructure-dev \
  --template-body file://cf-template.yaml \
  --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair-name \
               ParameterKey=AllowedSshCidr,ParameterValue=YOUR.IP.ADDRESS/32 \
  --capabilities CAPABILITY_NAMED_IAM
```

### Production Deployment
```bash
aws cloudformation create-stack \
  --stack-name secure-infrastructure-prod \
  --template-body file://cf-template.yaml \
  --parameters ParameterKey=Environment,ParameterValue=prod \
               ParameterKey=KeyPairName,ParameterValue=your-prod-key-pair \
               ParameterKey=AllowedSshCidr,ParameterValue=10.0.0.0/8 \
               ParameterKey=InstanceType,ParameterValue=t3.large \
               ParameterKey=ProjectName,ParameterValue=my-production-app \
  --capabilities CAPABILITY_NAMED_IAM
```

## Important Security Notes

### SSH Access Configuration
⚠️ **CRITICAL**: Never use `0.0.0.0/0` for `AllowedSshCidr`

**Recommended values**:
- Your specific IP: `YOUR.IP.ADDRESS/32`
- Your office network: `YOUR.OFFICE.NETWORK/24`
- VPN network: `10.0.0.0/8` (if using VPN)
- Corporate network: `YOUR.CORP.CIDR/XX`

### S3 Bucket Naming
The template automatically creates unique bucket names using:
`${BucketPrefix}-${AWS::AccountId}-${AWS::Region}`

Example: `secure-demo-bucket-123456789012-us-east-1`

## Parameter Reference

| Parameter | Default | Description | Example |
|-----------|---------|-------------|---------|
| `VpcCidr` | 10.0.0.0/16 | VPC CIDR block | 10.0.0.0/16 |
| `PublicSubnetCidr` | 10.0.1.0/24 | Public subnet CIDR | 10.0.1.0/24 |
| `PrivateSubnetCidr` | 10.0.2.0/24 | Private subnet CIDR | 10.0.2.0/24 |
| `AllowedSshCidr` | 10.0.0.0/8 | SSH access CIDR | YOUR.IP/32 |
| `InstanceType` | t3.medium | EC2 instance type | t3.large |
| `KeyPairName` | *Required* | EC2 Key Pair name | my-key-pair |
| `BucketPrefix` | secure-demo-bucket | S3 bucket prefix | my-app-bucket |
| `EnableVersioning` | Enabled | S3 versioning | Enabled/Suspended |
| `Environment` | dev | Environment tag | dev/staging/prod |
| `ProjectName` | secure-infrastructure | Project name | my-project |

## Outputs Reference

After deployment, the stack provides these outputs:

| Output | Description | Use Case |
|--------|-------------|----------|
| `VPCId` | VPC identifier | Reference in other stacks |
| `PublicSubnetId` | Public subnet ID | Deploy public resources |
| `PrivateSubnetId` | Private subnet ID | Deploy private resources |
| `WebSecurityGroupId` | Security group ID | Reference for other instances |
| `InstanceId` | EC2 instance ID | Monitoring, management |
| `InstancePublicIP` | Public IP address | SSH access, DNS records |
| `S3BucketName` | S3 bucket name | Application configuration |
| `CloudWatchLogGroupName` | Log group name | Log analysis, monitoring |

## Cost Optimization Features

### Automatic Cost Savings
- **Instance Type**: t3.medium (30-40% cheaper than t2.large)
- **Storage**: GP3 volumes (20% cheaper than GP2)
- **S3 Lifecycle**: Automatic transitions to cheaper storage classes
- **Monitoring**: Environment-based detailed monitoring (prod only)

### Expected Monthly Costs (us-east-1)
- **Development**: ~$25-30/month
- **Production**: ~$45-55/month (with detailed monitoring)

*Costs may vary by region and usage patterns*

## Monitoring and Alerts

### Built-in Alarms
- **High CPU**: Triggers when CPU > 80% for 10 minutes
- **Low Disk Space**: Triggers when disk usage > 85%

### CloudWatch Logs
- System logs automatically sent to CloudWatch
- Retention: 30 days (dev), 365 days (prod)

### Custom Metrics
- CPU usage breakdown
- Memory utilization
- Disk space utilization

## Troubleshooting

### Common Issues

**1. Stack creation fails with "Key pair does not exist"**
```bash
# List available key pairs
aws ec2 describe-key-pairs --query 'KeyPairs[].KeyName'
```

**2. SSH connection refused**
- Verify your IP is in the AllowedSshCidr range
- Check security group rules in AWS Console
- Ensure instance is in running state

**3. S3 bucket name conflicts**
- The template uses account ID and region suffix to prevent conflicts
- If still conflicts, change the BucketPrefix parameter

**4. IAM permissions errors**
- Ensure you have permissions to create IAM roles
- Use `--capabilities CAPABILITY_NAMED_IAM` flag

### Validation Commands
```bash
# Validate template syntax
aws cloudformation validate-template --template-body file://cf-template.yaml

# Check stack status
aws cloudformation describe-stacks --stack-name your-stack-name

# View stack events
aws cloudformation describe-stack-events --stack-name your-stack-name
```

## Cleanup

To delete the stack and all resources:
```bash
aws cloudformation delete-stack --stack-name your-stack-name
```

⚠️ **Note**: S3 bucket must be empty before stack deletion. If versioning is enabled, delete all versions first.

## Next Steps

1. **Customize**: Modify parameters for your specific requirements
2. **Extend**: Add additional resources (RDS, Load Balancer, etc.)
3. **Automate**: Integrate with CI/CD pipelines
4. **Monitor**: Set up additional CloudWatch dashboards
5. **Secure**: Implement additional security controls as needed

## Support

For issues or questions:
1. Check AWS CloudFormation documentation
2. Review CloudWatch logs for detailed error messages
3. Validate template syntax before deployment
4. Test in development environment first