provider "aws" {
  region = "ap-northeast-1"
  profile = "mine"
}

resource "aws_s3_bucket" "lambda" {
  bucket = "watchlist-bundle"
}

resource "aws_s3_object" "lambda_object" {
  bucket = aws_s3_bucket.lambda.bucket
  key    = "watchlist.zip"
  source = "/Users/ericlo/mine/watchlist/dist/watchlist.zip"
  etag   = filemd5("/Users/ericlo/mine/watchlist/dist/watchlist.zip")
}

resource "aws_iam_role" "lambda_execution_role" {
  name = "watchlist_lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Effect = "Allow"
        Sid = ""
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
        Effect = "Allow"
      },
    ]
  })
}

resource "aws_lambda_function" "example" {
  function_name = "WatchlistLambda"

  s3_bucket = aws_s3_bucket.lambda.bucket
  s3_key    = aws_s3_object.lambda_object.key
  source_code_hash = filebase64sha256("/Users/ericlo/mine/watchlist/dist/watchlist.zip")

  handler = "index.handler"
  role    = aws_iam_role.lambda_execution_role.arn
  runtime = "nodejs16.x"
}

resource "aws_cloudwatch_event_rule" "lambda_scheduler" {
  name                = "lambda-scheduler"
  description         = "Triggers Lambda on schedule"
  schedule_expression = "cron(0 */6 * * ? *)"
}

resource "aws_cloudwatch_event_target" "example" {
  rule      = aws_cloudwatch_event_rule.lambda_scheduler.name
  target_id = "WatchlistLambda"
  arn       = aws_lambda_function.example.arn
}

# 給CloudWatch事件規則的執行角色添加權限
resource "aws_lambda_permission" "allow_cloudwatch_to_call_checkip" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda_scheduler.arn
}
