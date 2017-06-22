/* jshint esversion:6 */

const OK = (m) => {
  return {
    message:m,
    valid:true
  };
};

const NOT_OK = (m) => {
  return {
    message:m,
    valid:false
  };
};

const codeToMessage = (code) => {
  if(code >= 0 || code <= 99){
    return OK("Transacción autorizada para pagos y preautorizaciones");
  }

  switch(code){
    case 900: return OK("Transacción autorizada para devoluciones y confirmaciones");
    case 101: return NOT_OK("Tarjeta caducada");
    case 102: return NOT_OK("Tarjeta en excepción transitoria o bajo sospecha de fraude");
    case 106: return NOT_OK("Intentos de PIN excedidos");
    case 125: return NOT_OK("Tarjeta no efectiva");
    case 129: return NOT_OK("Código de seguridad (CVV2/CVC2) incorrecto");
    case 180: return NOT_OK("Tarjeta ajena al servicio");
    case 184: return NOT_OK("Error en la autenticación del titular");
    case 190: return NOT_OK("Denegación del emisor sin especificar motivo");
    case 191: return NOT_OK("Fecha de caducidad errónea");
    case 202: return NOT_OK("Tarjeta en excepción transitoria o bajo sospecha de fraude con retirada de tarjeta");
    case 904: return NOT_OK("Comercio no registrado en FUC");
    case 909: return NOT_OK(" Error de sistema");
    case 913: return NOT_OK(" Pedido repetido");
    case 944: return NOT_OK(" Sesión Incorrecta");
    case 950: return NOT_OK(" Operación de devolución no permitida");
    case 9912: return NOT_OK(" Emisor no disponible");
    case 912: return NOT_OK(" Emisor no disponible");
    case 9064: return NOT_OK(" Número de posiciones de la tarjeta incorrecto");
    case 9078: return NOT_OK(" Tipo de operación no permitida para esa tarjeta");
    case 9093: return NOT_OK(" Tarjeta no existente");
    case 9094: return NOT_OK(" Rechazo servidores internacionales");
    case 9104: return NOT_OK(" Comercio con “titular seguro” y titular sin clave de compra segura");
    case 9218: return NOT_OK(" El comercio no permite op. seguras por entrada /operaciones");
    case 9253: return NOT_OK(" Tarjeta no cumple el check-digit");
    case 9256: return NOT_OK(" El comercio no puede realizar preautorizaciones");
    case 9257: return NOT_OK(" Esta tarjeta no permite operativa de preautorizaciones");
    case 9261: return NOT_OK(" Operación detenida por superar el control de restricciones en la entrada al SIS");
    case 9913: return NOT_OK(" Error en la confirmación que el comercio envía al TPV Virtual (solo aplicable en la opción de sincronización SOAP)");
    case 9914: return NOT_OK(" Confirmación “KO” del comercio (solo aplicable en la opción de sincronización SOAP)");
    case 9915: return NOT_OK(" A petición del usuario se ha cancelado el pago");
    case 9928: return NOT_OK(" Anulación de autorización en diferido realizada por el SIS (proceso batch)");
    case 9929: return NOT_OK(" Anulación de autorización en diferido realizada por el comercio");
    case 9997: return NOT_OK(" Se está procesando otra transacción en SIS con la misma tarjeta");
    case 9998: return NOT_OK(" Operación en proceso de solicitud de datos de tarjeta");
    case 9999: return NOT_OK(" Operación que ha sido redirigida al emisor a autenticar");
    default: return NOT_OK("UNDEFINED ANSWER");
  }
};

export {codeToMessage};
