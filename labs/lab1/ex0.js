function cutstring(str1) {
  if (str1.length < 2)
    return "";
  else if (str1.length == 2)
    return str1 + str1;
  else if (str1.length == 3)
    return "".concat(str1[0], str1[1], str1[1], str1[2]);
  else
    return "".concat(str1.slice(0, 2), str1.slice(str1.length - 2, str1.length));
}