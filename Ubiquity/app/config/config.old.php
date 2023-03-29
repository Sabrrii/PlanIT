<?php
return array(
	"siteUrl"=>"http://127.0.0.1:8090/",
	"database"=>[
			"type"=>"mysql",
			"wrapper"=>"Ubiquity\\db\\providers\\pdo\\PDOWrapper",
			"dbName"=>"planitpoker",
			"serverName"=>"127.0.0.1",
			"port"=>"3306",
			"user"=>"root",
			"password"=>"",
			"options"=>[],
			"cache"=>false
			],
	"sessionName"=>"S1234567890",
	"namespaces"=>[],
	"templateEngine"=>"\\Ubiquity\\views\\engine\\twig\\Twig",
	"templateEngineOptions"=>[
			"cache"=>false
			],
	"test"=>false,
	"debug"=>false,
	"logger"=>function (){
		return new \Ubiquity\log\libraries\UMonolog(array (
  'host' => '127.0.0.1',
  'port' => 8090,
  'sessionName' => 'S1234567890',
)['sessionName'], \Monolog\Logger::INFO);
	},
	"di"=>[
			"@exec"=>[
					"jquery"=>function ($controller){
                    return \Ajax\php\ubiquity\JsUtils::diSemantic($controller);
                }
					]
			],
	"cache"=>[
			"directory"=>"cache/",
			"system"=>"Ubiquity\\cache\\system\\ArrayCache",
			"params"=>[]
			],
	"mvcNS"=>[
			"models"=>"models",
			"controllers"=>"controllers",
			"rest"=>""
			],
	"encryption_key"=>getenv('encryption_key'),
	"app.env"=>"dev",
	"onError"=>function ($code, $message = NULL, $controllerInstance = NULL){
				switch ($code) {
					case 404:
					case 500:
						throw new \Exception($message);
						break;
				}
			}
	);