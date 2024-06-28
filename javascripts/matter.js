

document.addEventListener("DOMContentLoaded", function() {
    // Получаем ссылку на канвас и на контейнер с изображениями
    const canvas = document.querySelector("#canvas-target");
    const wrapper = document.querySelector(".positioning");
    // Получаем массив изображений в контейнере
    const svgElements = wrapper.querySelectorAll("img.a-image"); // Ваши изображения

    // Загрузка изображений
    let imagesLoaded = 0;
    const totalImages = svgElements.length;

    // Функция предзагрузки изображений
    function preloadImages() {
        svgElements.forEach((svg, index) => {
            const image = new Image();
            // Увеличиваем счетчик загруженных изображений
            image.onload = function() {
                imagesLoaded++;
                // После загрузки всех изображений создаем тела
                if (imagesLoaded === totalImages) {
                    createBodies();
                }
            };
            // Устанавливаем источник изображения для предзагрузки
            image.src = svg.src;
        });
    }

    // Функция создания тел объектов на основе изображений
    function createBodies() {
        // Подключаем модули Matter.js
        let Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        // Создаем движок
        let engine = Engine.create();

        // Создаем рендерер
        let render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                background: "transparent",
                wireframes: false,
                width: window.innerWidth,
                height: window.innerHeight,
            }
        });

        // Создаем тела объектов на основе изображений
        // let bodies = [];
        // svgElements.forEach((svg, index) => {
        //     let body = Bodies.rectangle(index * 200, 200, 200, 200, {
        //         render: {
        //             sprite: {
        //                 texture: "./img/95.svg" 
        //             }
        //         }
        //     });
        //     bodies.push(body);
        // });
        // Composite.add(engine.world, bodies);

        //create objects
      
        let box_1 = Bodies.rectangle(1000, 200, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/90.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_1);
      
      let box_2 = Bodies.rectangle(200, 250, 200,200,  
        {
        render: {
          sprite: {
            texture: "./img/94.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_2);

      let box_3 = Bodies.rectangle(300, 400, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/95.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_3);
      
      let box_4 = Bodies.rectangle(400, 100, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/96.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_4);
      
      let box_5 = Bodies.rectangle(800, 800, 300, 300,  
        {
        render: {
          sprite: {
            texture: "./img/on.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_5);
      
      let box_6 = Bodies.rectangle(500, 500, 200, 200,   
        {
        render: {
          sprite: {
            texture: "./img/90.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_6);
      
      let box_7 = Bodies.rectangle(600, 600, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/94.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_7);
      
      let box_8 = Bodies.rectangle(900, 250, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/95.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_8);
      
      let box_9 = Bodies.rectangle(1200, 800, 200, 200, 
        {
        render: {
          sprite: {
            texture: "./img/96.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_9);
      
      let box_10 = Bodies.rectangle(200, 600, 200, 200,  
        {
        render: {
          sprite: {
            texture: "./img/on.svg"
          }
        }
      }
      );
      Composite.add(engine.world, box_10);

        // Создаем "землю"
        let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 100, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
            }
        });
        Composite.add(engine.world, ground);
        
        // Добавляем стены
        let leftWall = Bodies.rectangle(0, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
        let rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
        Composite.add(engine.world, [leftWall, rightWall]);
        
      
      // add all of the bodies to the world
      Composite.add(engine.world, leftWall);
      Composite.add(engine.world, rightWall);

        // Запускаем рендерер
        Render.run(render);

        // Создаем и запускаем движок
        let runner = Runner.create();
        Runner.run(runner, engine);

        // Создаем ограничение мыши
        let mouse = Mouse.create(render.canvas);
        let mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        Composite.add(engine.world, mouseConstraint);

        // Обработка перетаскивания
        svgElements.forEach(svg => {
            svg.addEventListener("mousedown", function(event) {
                event.preventDefault();
                event.stopPropagation();
                const initialX = event.clientX;
                const initialY = event.clientY;

                function moveHandler(moveEvent) {
                    const movementX = moveEvent.clientX - initialX;
                    const movementY = moveEvent.clientY - initialY;
                    Composite.translate(engine.world, bodies, { x: movementX, y: movementY });
                }

                document.addEventListener("mousemove", moveHandler);

                document.addEventListener("mouseup", function() {
                    document.removeEventListener("mousemove", moveHandler);
                }, { once: true });
            });
        });
    }

    

    // Загрузка изображений перед созданием тел
    preloadImages();

    

});

