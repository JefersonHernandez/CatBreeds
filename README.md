# **CatBreeds App**

## **Descripción**

CatBreeds App es una aplicación móvil desarrollada en React Native que permite explorar diferentes razas de gatos. Utilizando The Cat API.

---

## Características

- **Búsqueda de razas de gatos**: Los usuarios pueden buscar razas de gatos ingresando texto en un campo de búsqueda.
- **Detalles de razas**: Al seleccionar una raza, se muestra información detallada, incluyendo imágenes, descripción y características.
- **Internacionalización**: Soporte para múltiples idiomas utilizando `i18next`.

---

## **Estructura del Proyecto**

```
CatBreeds/
├── .maestro/               # Configuración de flujos de prueba automatizados
│   └── flow.yml            # Archivo de definición de flujos
├── android/                # Configuración específica para Android
│   ├── app/                # Código fuente de la aplicación Android
│   └── build.gradle        # Configuración de Gradle
├── ios/                    # Configuración específica para iOS
│   ├── CatBreeds/          # Código fuente de la aplicación iOS
│   ├── Podfile             # Configuración de CocoaPods
│   └── CatBreeds.xcodeproj # Proyecto de Xcode
├── src/                    # Código fuente principal
│   ├── domain/             # Lógica de negocio
│   │   ├── models/         # Modelos de datos (e.g., Cat, Picture)
│   │   ├── repositories/   # Interfaces y repositorios
│   │   └── services/       # Servicios de negocio
│   ├── infrastructure/     # Infraestructura y configuración
│   │   ├── components/     # Componentes reutilizables
│   │   │   ├── atoms/      # Componentes básicos (e.g., texto, imágenes)
│   │   │   ├── molecules/  # Componentes más complejos (e.g., tarjetas, etiquetas)
│   │   │   └── organisms/  # Componentes de mayor nivel
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── instances/      # Configuración de instancias (e.g., Axios)
│   │   ├── navigators/     # Configuración de navegación
│   │   ├── pages/          # Pantallas principales (CatsPage, CatDetailPage)
│   │   ├── repositories/   # Implementaciones de repositorios
│   │   └── services/       # Servicios de infraestructura
│   ├── types/              # Tipos y definiciones
│   └── utils/              # Funciones auxiliares y utilidades
├── assets/                 # Recursos estáticos (imágenes, fuentes, etc.)
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del proyecto
```

---

## **Requisitos del Sistema**

- **Node.js**: v18 o superior
- **React Native CLI**: Instalado globalmente
- **Android Studio**: Para emulación y compilación en Android
- **Xcode**: Para emulación y compilación en iOS
- **Maestro**: Para pruebas automatizadas

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JefersonHernandez/CatBreeds.git
   ```

   ```bash
   cd CatBreeds
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las variable:

     ```
     #Obten tu api key en https://thecatapi.com
     API_KEY=tu_api_key

     #Obten tu api url en https://thecatapi.com
     API_URL=tu_api_url
     ```

4. Inicia la aplicación:
   - Para iOS:
     ```bash
     npx react-native run-ios
     ```
   - Para Android:
     ```bash
     npx react-native run-android
     ```

---

## **Uso**

1. Abre la aplicación en tu dispositivo o emulador.
2. Usa el campo de búsqueda para buscar razas de gatos.
3. Selecciona una raza para ver más detalles.
4. Navega entre pantallas utilizando los controles de navegación.

---

## **Pruebas**

El proyecto utiliza [Maestro](https://maestro.mobile.dev/) para pruebas automatizadas. Los flujos están definidos en el archivo `flow.yml`.

### Ejecutar pruebas:

1. Instala Maestro:

   ```bash
   brew install maestro
   ```

2. Ejecuta los flujos de prueba:
   ```bash
   maestro test .maestro/flow.yml --env APP_ID=YOUR_APP_ID
   ```

---

## **Pruebas Unitarias**

El proyecto incluye pruebas unitarias para garantizar la calidad y el correcto funcionamiento de los componentes, servicios y lógica de negocio. Se utiliza **Jest** como framework principal para las pruebas.

Las pruebas unitarias siguen la convención de nombrar los archivos de prueba con la extensión `.test.ts` o `.test.tsx`.

### **Ejecutar Pruebas**

Para ejecutar las pruebas unitarias, asegúrate de tener todas las dependencias instaladas y ejecuta el siguiente comando:

```bash
npm test
```

---

## **Dependencias Principales**

- **React Native**: Framework principal para el desarrollo móvil.
- **React Navigation**: Manejo de navegación entre pantallas.
- **React Query**: Manejo de datos asincrónicos.
- **Axios**: Cliente HTTP para consumir APIs.
- **i18next**: Soporte para internacionalización.
- **Maestro**: Pruebas automatizadas para aplicaciones móviles.
- **React Native Testing Library**: React Native Testing Library (RNTL) es una solución ligera para probar componentes React Native.

---

## **Estructura de Navegación**

La navegación de la aplicación está configurada utilizando `react-navigation` con un stack principal:

- **Pantallas principales**:
  - `CatsPage`: Pantalla de búsqueda y listado de razas.
  - `CatDetailPage`: Pantalla de detalles de una raza específica.

```tsx
// filepath: index.tsx
const Stack = createNativeStackNavigator<MainParamList>();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cats" component={CatsPage} />
        <Stack.Screen name="CatDetail" component={CatDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## **Contribución**

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Envía un pull request.

---

## **Preview**

| Android                                | iOS                            |
| -------------------------------------- | ------------------------------ |
| ![Android GIF](./examples/android.gif) | ![iOS GIF](./examples/ios.gif) |

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
