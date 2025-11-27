using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ZvitPlus.DAL.Repositories
{
    public static class Helper
    {
        public static Expression<Func<T, T>> Combine<T>(
            Expression<Func<T, T>> first,
            Expression<Func<T, T>> second)
        {
            var param = Expression.Parameter(typeof(T), "s");

            var body = Expression.Invoke(second,
                Expression.Invoke(first, param));

            return Expression.Lambda<Func<T, T>>(body, param);
        }
    }
}
