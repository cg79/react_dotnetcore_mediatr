using System;
namespace cqrsTests.Tests.User.Helpers
{
    public class PhoneNumberGenerator
    {
        private static readonly Random _random = new Random();

        public string GeneratePhoneNumber()
        {
            var areaCode = GenerateRandomDigits(3);
            var exchangeCode = GenerateRandomDigits(3);
            var subscriberNumber = GenerateRandomDigits(4);

            // Format the phone number
            var phoneNumber = $"{areaCode}-{exchangeCode}-{subscriberNumber}";
            return phoneNumber;
        }

        private string GenerateRandomDigits(int length)
        {
            var digits = new char[length];
            for (int i = 0; i < length; i++)
            {
                digits[i] = (char)(_random.Next(10) + '0');
            }
            return new string(digits);
        }
    }

}

